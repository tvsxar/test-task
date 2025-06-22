const API_URL = "http://localhost:8000/api/v1";
const credentials = {
  email: "zxcq020520@gmail.com",
  password: "admin-password",
};

export async function getMovies(token) {
  const response = await fetch(`${API_URL}/movies`, {
    headers: { Authorization: token },
  });

  const data = await response.json();
  const movieList = data.data || [];

  const moviesWithActors = await Promise.all(
    movieList.map((movie) => getMovieById(movie.id, token))
  );

  return moviesWithActors;
}

export async function deleteMovie(id, token) {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }
}

export async function addMovie(movie, token) {
  const response = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(movie),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error?.message || "Error adding movie");
  }

  return result;
}

export async function getMovieById(id, token) {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    headers: { Authorization: token },
  });

  const data = await response.json();

  if (!response.ok || data.status !== 1) {
    throw new Error("Failed to fetch movie details");
  }

  return data.data;
}

// login function

export async function loginUser() {
  const response = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (data.status !== 1) {
    throw new Error(data?.error?.code || "Login failed");
  }

  return data.token;
}
