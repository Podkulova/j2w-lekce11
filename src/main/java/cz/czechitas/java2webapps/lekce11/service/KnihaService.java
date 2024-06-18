package cz.czechitas.java2webapps.lekce11.service;

import cz.czechitas.java2webapps.lekce11.entity.Kniha;
import cz.czechitas.java2webapps.lekce11.repository.KnihaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Služby pro práci s knihami.
 */
@Service
public class KnihaService {

    private final KnihaRepository repository;

    @Autowired
    public KnihaService(KnihaRepository repository) {
        this.repository = repository;
    }

    public Page<Kniha> seznam(Pageable pageable) {
        return repository.findByStornovanoFalseOrderByNazev(pageable);
    }

    public Page<Kniha> seznamVcetneStornovanych(Pageable pageable) {
        return repository.findAllByOrderByNazev(pageable);
    }

    public Optional<Kniha> detail(long id) {
        return repository.findById(id);
    }

    public Kniha pridat(Kniha kniha) {
        Objects.requireNonNull(kniha);
        requireNoId(kniha);
        return repository.save(kniha);
    }

    public List<Kniha> pridatDavkove(List<Kniha> knihy) {
        Objects.requireNonNull(knihy);
        for (Kniha kniha : knihy) {
            Objects.requireNonNull(kniha);
            requireNoId(kniha);
        }
        return repository.saveAll(knihy);
    }

    public Kniha upravit(Kniha kniha) {
        Objects.requireNonNull(kniha);
        Objects.requireNonNull(kniha.getId());
        return repository.save(kniha);
    }

    public Kniha smazat(long id) {
        Kniha kniha = repository.getOne(id);
        kniha.setStornovano(true);
        return repository.save(kniha);
    }

    public Kniha obnovit(long id) {
        Kniha kniha = repository.getOne(id);
        kniha.setStornovano(false);
        return repository.save(kniha);
    }

    private void requireNoId(Kniha kniha) {
        if (kniha.getId() != null) {
            throw new IllegalArgumentException("Nelze přidat knihu, která má nastavené ID.");
        }
    }
}
