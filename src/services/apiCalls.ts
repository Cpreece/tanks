class Scores {
  static async get(order: string = '-level') {
    try {
      const response = await fetch(`http://localhost:8000/scores?order=${order}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const content = await response.json()
      return await content
    } catch (err) {
      console.error(err)
    }
  }

  static async post(data) {
    try {
      const jsonData = JSON.stringify(data);
      const response = await fetch('http://127.0.0.1:8000/post-score', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: jsonData
      });
      const content = await response.json()
      return await content
    } catch (err) {
      console.error(err)
    }
  }
}

export default Scores
