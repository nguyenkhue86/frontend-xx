package com.vn.dth.service.converter;

import com.vn.dth.entity.ImageEntity;
import com.vn.dth.reposetory.ImageRepository;
import com.vn.dth.service.dto.ImageDto;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class ImageConverter {
    @Autowired
    ImageRepository imageRepository;

    public ImageDto toDto(ImageEntity entity) {
        if (entity != null) {
            return new ImageDto(entity.getId(), entity.getName(), entity.getType(), entity.getSize(), entity.getUrl());
        } else {
            return null;
        }
    }

    public ImageEntity toEntoty(ImageDto dto) {
        if (dto != null) {
            return new ImageEntity(dto.getId(), dto.getName(), dto.getType(), dto.getSize(), dto.getUrl());
        } else {
            return null;
        }
    }

    public List<ImageDto> toDtos(List<ImageEntity> entities) {
        List<ImageDto> imageDtos = new ArrayList<>();
        if (entities != null && !entities.isEmpty()) {
            entities.forEach(entity -> imageDtos.add(toDto(entity)));
            return imageDtos;
        } else {
            return imageDtos;
        }
    }

    public  List<ImageEntity> toEntities(List<ImageDto> dtos) {
        List<ImageEntity> imageEntities = new ArrayList<>();
        if (dtos != null && !dtos.isEmpty()) {
            dtos.forEach(imageDto -> imageEntities.add(toEntoty(imageDto)));
            return imageEntities;
        } else {
            return imageEntities;
        }
    }
}
