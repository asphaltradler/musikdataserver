package com.cosmaslang.musikdataserver.controller;

import com.cosmaslang.musikdataserver.db.entities.Track;
import com.cosmaslang.musikdataserver.db.entities.Werk;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@RestController
@RequestMapping("/musik/werk")
public class WerkRestController extends AbstractMusikRestController<Werk> {
    @Override
    public Werk getById(@PathVariable Long id) {
        return getEntityIfExists(id, werkRepository);
    }

    @Override
    protected String remove(Long id) {
        return null;
    }

    @Override
    protected List<Werk> find(String track, String album, String komponist, String werk, String genre, String interpret, Long id) {
        super.find(track, album, komponist, werk, genre, interpret, id);
        if (werk != null) {
            return werkRepository.findByNameContainingIgnoreCase(werk).stream().sorted().toList();
        } else if (album != null) {
            Stream<Werk> werkStream = trackRepository.findByAlbumLike(album).stream().map(Track::getWerk).filter(Objects::nonNull);
            return werkStream.distinct().sorted().toList();
        } else if (genre != null) {
            List<Track> tracks = trackRepository.findByGenreLike(genre);
            return tracks.stream().map(Track::getWerk).filter(Objects::nonNull).distinct().sorted().toList();
        } else if (interpret != null) {
            List<Track> tracks = trackRepository.findByInterpretenLike(interpret);
            return tracks.stream().map(Track::getWerk).filter(Objects::nonNull).distinct().sorted().toList();
        }
        return get(id, werkRepository);
    }
}
