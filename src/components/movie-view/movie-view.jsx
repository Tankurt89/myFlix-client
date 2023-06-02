export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <br></br>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>  
            </div>
            <div>
                <span>Genre Description:</span>
                <span>{movie.Genre.Description}</span>
            </div>
            <br></br>
            <div>
                <span>Director:</span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Bio:</span>
                <span>{movie.Director.Bio}</span>
            </div>
            <div>
                <span>Birth:</span>
                <span>{movie.Director.Birth}</span>
            </div>
            <div>
                <span>Death:</span>
                <span>{movie.Director.Death}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
}
