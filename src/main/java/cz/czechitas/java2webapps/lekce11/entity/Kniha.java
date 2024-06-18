package cz.czechitas.java2webapps.lekce11.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * Entita reprezentující jednu knihu v knihovně.
 */
@Entity
public class Kniha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nazev;

    @NotBlank
    private String autor;

    @Min(1447)
    private short rokVydani;

    @Pattern(regexp = "[0-9]{13}|[0-9]{9}[0-9X]")
    private String isbn;

    @Version
    private int version;

    private boolean stornovano;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazev() {
        return nazev;
    }

    public void setNazev(String nazev) {
        this.nazev = nazev;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public short getRokVydani() {
        return rokVydani;
    }

    public void setRokVydani(short rokVydani) {
        this.rokVydani = rokVydani;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public boolean isStornovano() {
        return stornovano;
    }

    public void setStornovano(boolean stornovano) {
        this.stornovano = stornovano;
    }
}
