package com.company;

public class Fish extends Animal{
    private int gills,eyes,fins;

    public Fish(int size, int weight, String name, int gills, int eyes, int fins) {
        super(1, 1, size, weight, name);
        this.gills = gills;
        this.eyes = eyes;
        this.fins = fins;
    }

    private void rest(){}

    private void moveMuscles(){
        System.out.println("Fish.movMuscles() called");
    }

    private void moveBackFin(){
        System.out.println(("Fish.moveBackFin() called"));
    }

    private void swim(int speed){
        moveMuscles();
        moveBackFin();
        super.move(speed);
    }
}