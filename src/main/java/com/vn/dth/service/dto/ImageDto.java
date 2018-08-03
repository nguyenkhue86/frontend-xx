package com.vn.dth.service.dto;

import java.io.Serializable;
import java.util.Objects;

public class ImageDto implements Serializable {

    private Long id;

    private String name;

    private String type;

    private Long size;

    private String url;

    public ImageDto() {
        super();
    }

    public ImageDto(Long id, String name, String type, Long size, String url) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.size = size;
        this.url = url;
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

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ImageDto imageDto = (ImageDto) o;
        return Objects.equals(id, imageDto.id) &&
                Objects.equals(name, imageDto.name) &&
                Objects.equals(type, imageDto.type) &&
                Objects.equals(size, imageDto.size) &&
                Objects.equals(url, imageDto.url);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, size, url);
    }

    @Override
    public String toString() {
        return "ImageDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", size=" + size +
                ", url='" + url + '\'' +
                '}';
    }
}
