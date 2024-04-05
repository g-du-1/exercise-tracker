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
    private int targetRepsMin;
    private int targetRepsMax;
    private boolean isDuration;
    private int targetRest;
    private int additionalRest;
    private String mediaLink;

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

    public int getTargetRepsMin() {
        return targetRepsMin;
    }

    public void setTargetRepsMin(int targetRepsMin) {
        this.targetRepsMin = targetRepsMin;
    }

    public int getTargetRepsMax() {
        return targetRepsMax;
    }

    public void setTargetRepsMax(int targetRepsMax) {
        this.targetRepsMax = targetRepsMax;
    }

    public boolean getIsDuration() {
        return isDuration;
    }

    public void setIsDuration(boolean isDuration) {
        this.isDuration = isDuration;
    }

    public int getTargetRest() {
        return targetRest;
    }

    public void setTargetRest(int targetRest) {
        this.targetRest = targetRest;
    }

    public int getAdditionalRest() {
        return additionalRest;
    }

    public void setAdditionalRest(int additionalRest) {
        this.additionalRest = additionalRest;
    }

    public String getMediaLink() {
        return mediaLink;
    }

    public void setMediaLink(String mediaLink) {
        this.mediaLink = mediaLink;
    }

    public Exercise(String name, String category, String type, int targetSets, int targetRepsMin, int targetRepsMax, boolean isDuration, int targetRest, int additionalRest, String mediaLink) {
        this.name = name;
        this.category = category;
        this.type = type;
        this.targetSets = targetSets;
        this.targetRepsMin = targetRepsMin;
        this.targetRepsMax = targetRepsMax;
        this.isDuration = isDuration;
        this.targetRest = targetRest;
        this.additionalRest = additionalRest;
        this.mediaLink = mediaLink;
    }

    public Exercise() {}
}
