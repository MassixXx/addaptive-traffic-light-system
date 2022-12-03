import requests
import json
import RPi.GPIO as GPIO
import time

url = "http://172.20.10.4:5000/times"

rasp_id = 1 #Raspberry ID
roads_ids = [1,2,3,4] #Connected Roads id's
R1 = [1,3] #Road 1 
R2 = [2,4] #Road 2
t1 = t2 = 5 #initial waiting time
c1Red = 18 #chemin 1 red light
c1Green = 27 #chemin1 green light

c2Red = 16 #chemin2 red light
c2Green = 5 #chemin2 green light

c3Red = 3 #chemin3 red light
c3Green = 2 #chemin3 green light

c4Red = 19 #chemin4 red light
c4Green = 26 #chemin4 green light

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(c1Red,GPIO.OUT)
GPIO.setup(c1Green,GPIO.OUT)
GPIO.setup(c2Red,GPIO.OUT)
GPIO.setup(c2Green,GPIO.OUT)
GPIO.setup(c3Red,GPIO.OUT)
GPIO.setup(c3Green,GPIO.OUT)
GPIO.setup(c4Red,GPIO.OUT)
GPIO.setup(c4Green,GPIO.OUT)

try:
    
    while True :
        
        #phase une
        #R1 Go
        GPIO.output(c1Green,GPIO.HIGH)
        GPIO.output(c1Red,GPIO.LOW)
        GPIO.output(c3Green,GPIO.HIGH)
        GPIO.output(c3Red,GPIO.LOW)

        #R2 Stop
        GPIO.output(c2Red,GPIO.HIGH)
        GPIO.output(c2Green,GPIO.LOW)
        GPIO.output(c4Red,GPIO.HIGH)
        GPIO.output(c4Green,GPIO.LOW)

        time.sleep(t1)

        #phase deux

        #R1 Stop
        GPIO.output(c1Red,GPIO.HIGH)
        GPIO.output(c1Green,GPIO.LOW)
        GPIO.output(c3Red,GPIO.HIGH)
        GPIO.output(c3Green,GPIO.LOW)

        #R2 Go

        GPIO.output(c2Green,GPIO.HIGH)
        GPIO.output(c2Red,GPIO.LOW)
        GPIO.output(c4Green,GPIO.HIGH)
        GPIO.output(c4Red,GPIO.LOW)

        time.sleep(t2)
        
        #Send images
        
        dict_id = {'id': rasp_id}
        json_file = json.dumps(dict_id)
        
        files = {f'{roads_ids[0]}': open("/home/pi/Desktop/1", 'rb'),
                 f'{roads_ids[1]}': open("/home/pi/Desktop/2", 'rb'),
                 f'{roads_ids[2]}': open("/home/pi/Desktop/3", 'rb'),
                 f'{roads_ids[3]}': open("/home/pi/Desktop/4", 'rb'),
                 'json_id': json_file
                 }

        response = requests.post(url, files=files)

        print(response.content)
        
        json_data_dict = json.loads(response.text)
        print(json_data_dict)
        t1 = json_data_dict["t1"]
        t2 = json_data_dict["t2"]

        #Cleaning
        pins = [c1Red, c1Green, c2Red, c2Green, c3Red, c3Green,c4Red, c4Green]

        for pin in pins:
            GPIO.output(pin,GPIO.LOW)

        

#Cleaning
finally :
    pins = [c1Red, c1Green, c2Red, c2Green, c3Red, c3Green,c4Red, c4Green]

    for pin in pins:
        GPIO.output(pin,GPIO.LOW)



