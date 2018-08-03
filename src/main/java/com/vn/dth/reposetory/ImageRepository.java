package com.vn.dth.reposetory;

import com.vn.dth.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository< ImageEntity, Long> {
}
