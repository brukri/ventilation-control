# ventilation-control IOT project

## Introduction
Controls the airflow of the Stiebel Eltron LWZ 170E plus ventilation device via a RaspberryPI

## Installation
```bash
yarn build

scp dist/ventilation.js pi@<ip>:~/ventilation
```

## Control airflow level
Very Low airflow
```bash
curl -X POST localhost:8080/ventilation-control/level/0
```
Low airflow
```bash
curl -X POST localhost:8080/ventilation-control/level/1
```
Medium airflow
```bash
curl -X POST localhost:8080/ventilation-control/level/2
```
High airflow
```bash
curl -X POST localhost:8080/ventilation-control/level/3
```  
