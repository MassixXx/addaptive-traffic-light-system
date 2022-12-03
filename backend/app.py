import torch
from flask import Flask, request, abort, jsonify
import json
import numpy as np

app = Flask(__name__)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

class Controller:
    def __init__(self,id,neighbours):
        self.id = id
        self.neighbours = neighbours
        self.propagate = False
        self.densities = {}
        self.optimum_speed = 0
        self.nbr_vehicules = []
    
    def propagation(self):
        self.propagate = True
    

#quelques instances de controllers qui nous permettront de faire les tests
controllers = [Controller(1,[2,3,4,5]),Controller(2,[1,3,5,7]),Controller(3,[1,2,5,7]),Controller(4,[1,5,6,7]),Controller(5,[1,2,3,4])]
def get_controller(id):
    return controllers[id-1]




@app.route('/times',methods = ['POST'])
def compute_optimum_times():
    
    files = request.files
    for x in files:
        if 'json' not in x:
            files[x].save('uploads/' + x)
    number_of_cars = [get_number_of_cars(model('uploads/' + x)) for x in files if 'json' not in x]
    number_of_cars = [int(x) for x in number_of_cars]
    print(number_of_cars)
    cntrl = get_controller(x)
    cntrl.densities = densities = {int(x):compute_density(model('uploads/' + x))}
    for x in densities.keys():
        if densities[x] > 0.3:
             #informer le controlleur de l'intersetion concernée de la forte densité engendrée
            cntrl.propagation()
    t1,t2 = optimizer(number_of_cars[0],number_of_cars[1],number_of_cars[2],number_of_cars[3])

    return jsonify(
            {
                "success": True,
                "t1" : t1,
                "t2" : t2
            }
    )
    
@app.route('/optimum_speed',methods=['POST'])
def get_optimum_speed():
    files = request.files
    for x in files:
        if 'json' not in x:
            files[x].save('uploads/' + x)
        else:
            json_file = json.loads(files[x])
    densities = {int(x):compute_density(model('uploads/' + x))}
    json.loads
    actual_speed = json_file['actual_speed']
    controller_id = json_file['id']
    controller = get_controller(controller_id)
    controller.optimum_speed = get_optimum_speed(densities.values[0],densities.values[2],actual_speed)

@app.route('/vehicule_number/<controller_id>')
def get_vehicules(controller_id):
    controller = get_controller(controller_id)
    return controller.nbr_vehicules

@app.route('/traffic_density/<controller_id>')
def get_traffic_density(controller_id):
    controller = get_controller(controller_id)
    return controller.densities
    


def optimizer(nbv1,nbv2,nbv3,nbv4,rtx2=0,rtx4=0,propagation=False,alpha=0.001,nbIter = 10000,epsilon=1):
    TEMPS_MAX = 240
    TEMPS_MIN = 30
    RTS = 3 #nbr de véhicules sortants par secondes
    #nbvi : nombre de voiture à la ligne i
    #rtxi : rtsi - rtei tq rtsi frequence de sorties de véhicules de la ligne i et rtei fréquence d'entrée de véhicules à la ligne i
    #alpha : degré d'avancement de l'algorithme
    #nbIter : nombre maximal d'itérations
    #return t1 et t2 tq t1 est le temps optimal de feu rouge pour feu1 et feu3 et t2 est le temps optimal de feu rouge pour le feu2 et le feu4

    #simulation de l'algorithme Gradient Descent

    #initialisation intiale de t1 et t2:
    t1 = t2 = 60 #temps en secondes
    stop = False #nous servira à sortir de la boucle
    i = 0
    old_coast = (nbv1 + nbv3) * t1 + (nbv2 - rtx2 * t1 + nbv4 - rtx4 * t1) * t2 + (nbv1 + nbv3 - 2 * t1 * RTS) * t2 + (nbv2 + nbv4 - 2 * t2 * RTS) * t1
    while not stop and i < nbIter:
        i+=1
        #sauvegarde de l'ancienne valeur de t1 + t2
        
        #calcul de la nouvelle valeur de t1 à partir de la dérivée de sa fonction
        t1 = t1 - alpha * (nbv1 + nbv3 - (rtx2 + rtx4) * t2)
        t2 = t2 - alpha * (nbv2 + nbv4 - (rtx2+rtx4)*t1)
    
        #verifier que t1 et t2 sont toujours dans les bornes TEMPS_MAX et TEMPS_MIN
        if t1 > TEMPS_MAX:
            t1 = TEMPS_MAX
            stop = True
        elif t1 < TEMPS_MIN:
            t1 = TEMPS_MIN
            stop = True
        if t2 > TEMPS_MAX:
            t2 = TEMPS_MAX
            stop = True
        elif t2 < TEMPS_MIN:
            t2 = TEMPS_MIN
            stop = True

        new_coast = (nbv1 + nbv3) * t1 + (nbv2 - rtx2 * t1 + nbv4 - rtx4 * t1) * t2 + (nbv1 + nbv3 - 2 * t1 * RTS) * t2 * ((nbv1 + nbv3 - 2 * t1 * RTS)>0) + (nbv2 + nbv4 - 2 * t2 * RTS) * t1
        #verifier si on a atteinds une condition d'arrêt
        
        if (old_coast - new_coast) < epsilon:
            stop = True
        else:
            old_coast = new_coast

        if propagation:
            t1 += 20
            t2 += 20
        
    return t1,t2


def get_number_of_cars(result):
    if type(result) != str:
        result = str(result)
    if 'car' not in result:
        return 0
    number_of_cars = int(result.split('\n')[0].split(',')[0].split(' ')[-2])
    return number_of_cars

def compute_density(result):
    #param : the output of the model('name of pic')
    #output : the traffic car density between 0 and 1
    
    #calcul des surfaces des carrés de l'image contenant des véhicules
    df = result.pandas().xyxyn[0]
    #créer une matrice vide qui nous servira à determiner avec des 1 les endroits où se trouvent les voitures
    a = np.zeros((100,100))
    for i in range(len(df)):
        xmin = df.iloc[i,0]
        ymin = df.iloc[i,1]
        xmax = df.iloc[i,2]
        ymax = df.iloc[i,3]
        a[round(xmin*100):round(xmax*100),round(ymin*100):round(ymax*100)] = 1
    
    unique , frequency = np.unique(a,return_counts=True)
    density = (frequency[1] * 100) / sum(frequency)
    return density

    
    def optimum_speed(density1,density2,actual_speed,rte1=1,rts2=1,alpha=0.5):
        #rte1 représente la fréquence d'entrée de véhicules sur la route 1
        #rts2 représente la fréquence de sortie de véhicules sur la route 2
        new_speed = actual_speed + (density1-density2) * (rts2 -rte1) * alpha
        return new_speed
