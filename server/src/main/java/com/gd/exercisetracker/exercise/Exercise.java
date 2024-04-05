package com.gd.exercisetracker.exercise;

import jakarta.persistence.*;

@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private String type;
    private int targetSets;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getTargetSets() {
        return targetSets;
    }

    public void setTargetSets(int targetSets) {
        this.targetSets = targetSets;
    }

    public Exercise(String name, String category, String type, int targetSets) {
        this.name = name;
        this.category = category;
        this.type = type;
        this.targetSets = targetSets;
    }

    public Exercise() {}
}
