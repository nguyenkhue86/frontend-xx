package com.vn.dth.service.dto;

import com.vn.dth.entity.ImageEntity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class ProductDto implements Serializable {

    private Long id;

    private String name;

    private String type;

    private Long price;

    private LocalDate modifiedDate;

    private ImageDto imageDto;

    public ProductDto() {
        super();
    }

    public ProductDto(Long id, String name, String type, Long price, LocalDate modifiedDate, ImageDto imageDto) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.modifiedDate = modifiedDate;
        this.imageDto = imageDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public LocalDate getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDate modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public ImageDto getImageDto() {
        return imageDto;
    }

    public void setImageDto(ImageDto imageDto) {
        this.imageDto = imageDto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductDto that = (ProductDto) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(type, that.type) &&
                Objects.equals(price, that.price) &&
                Objects.equals(modifiedDate, that.modifiedDate) &&
                Objects.equals(imageDto, that.imageDto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, price, modifiedDate, imageDto);
    }

    @Override
    public String toString() {
        return "ProductDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", price=" + price +
                ", modifiedDate=" + modifiedDate +
                ", imageDto=" + imageDto +
                '}';
    }
}
