import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
           id: 1,
           Title: "Silence of the Lambs",
           Description: "Jodie Foster stars as Clarice Starling, a top student at the FBIs training academy. Jack Crawford (Scott Glenn) wants Clarice to interview Dr. Hannibal Lecter (Anthony Hopkins), a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism.",
           Genre: {
            Name: "Thriller",
            Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
           },
           Director: {
            Name: "Jonathan Demme",
            Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
            Birth: "1944",
            Death: "2017"
           }
        },
        {
            id: 2,
            Title: "The Manchurian Candidate",
            Description: "Years after his squad was ambushed during the Gulf War, Major Ben Marco (Denzel Washington) finds himself having terrible nightmares",
            Genre: {
                Name: "Thriller",
                Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
               },
            Director: {
                Name: "Jonathan Demme",
                Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
                Birth: "1944",
                Death: "2017"
            },
        },
        {
            id: 3,
            Title: "The 40 Year-Old Virgin",
            Description: "Andy Stitzer is a shy 40-year-old introvert who works as a stock supervisor at electronics store Smart Tech. He gave up trying to have sex after various failed attempts and lives alone in an apartment with a collection of action figures and video games.",
            Genre: {
                Name: "Comedy",
                Description: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.",
            },
            Director: {
                Name: "Judd Apatow",
                Bio: "Judd Apatow is an American producer, writer, director, actor and stand-up comedian.",
                Birth: "1967",
            },
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    )
};