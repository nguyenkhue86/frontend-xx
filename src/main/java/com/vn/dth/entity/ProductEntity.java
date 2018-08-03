package com.vn.dth.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "product")
public class ProductEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "prive")
    private Long price;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modifiedDate")
    private LocalDate modifiedDate;

    @OneToOne
    @JoinColumn(name="imageId")
    private  ImageEntity imageEntity;

    public ProductEntity() {
        super();
    }

    public ProductEntity(Long id, String name, String type, Long price, LocalDate modifiedDate, ImageEntity imageEntity) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.modifiedDate = modifiedDate;
        this.imageEntity = imageEntity;
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

    public ImageEntity getImageEntity() {
        return imageEntity;
    }

    public void setImageEntity(ImageEntity imageEntity) {
        this.imageEntity = imageEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductEntity that = (ProductEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(type, that.type) &&
                Objects.equals(price, that.price) &&
                Objects.equals(modifiedDate, that.modifiedDate) &&
                Objects.equals(imageEntity, that.imageEntity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, price, modifiedDate, imageEntity);
    }

    @Override
    public String toString() {
        return "ProductEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", price=" + price +
                ", modifiedDate=" + modifiedDate +
                ", imageEntity=" + imageEntity +
                '}';
    }
}
