package com.gd.exercisetracker.exercise;

import jakarta.persistence.*;

@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String key;
    private String name;
    private String category;
    private String type;
    private int targetSets;
    private int targetRepsMin;
    private Integer targetRepsMax;
    private boolean isDuration;
    private int targetRest;
    private int additionalRest;
    private String mediaLink;
    @Column(columnDefinition = "TEXT")
    private String comments;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

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

    public Integer getTargetRepsMax() {
        return targetRepsMax;
    }

    public void setTargetRepsMax(Integer targetRepsMax) {
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

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Exercise(String key ,String name, String category, String type, int targetSets, int targetRepsMin, Integer targetRepsMax, boolean isDuration, int targetRest, int additionalRest, String mediaLink, String comments) {
        this.key = key;
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
        this.comments = comments;
    }

    public Exercise() {}
}
