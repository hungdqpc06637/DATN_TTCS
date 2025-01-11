package com.poly.dto;

public class QuantityUpdateRequest {
    private Integer sizeId;
    private Integer accountId;
    private Integer newQuantity;

    // Getter và Setter
    public Integer getsizeId() {
        return sizeId;
    }

    public void setsizeId(Integer sizeId) {
        this.sizeId = sizeId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getNewQuantity() {
        return newQuantity;
    }

    public void setNewQuantity(Integer newQuantity) {
        this.newQuantity = newQuantity;
    }
}


