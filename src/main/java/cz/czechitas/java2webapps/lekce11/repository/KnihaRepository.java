package cz.czechitas.java2webapps.lekce11.repository;

import cz.czechitas.java2webapps.lekce11.entity.Kniha;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository pro práci s knihami.
 */
@Repository
public interface KnihaRepository extends JpaRepository<Kniha, Long> {

    Page<Kniha> findByStornovanoFalseOrderByNazev(Pageable pageable);

    Page<Kniha> findAllByOrderByNazev(Pageable pageable);
}
