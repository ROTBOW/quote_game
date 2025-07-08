const sortScores = (scores) => {
    scores = Object.values(scores)
    
    return scores.sort((b, a) => {
    // First comparison - primary key
    if (a["score"] !== b["score"]) {
      return a["score"] > b["score"] ? 1 : -1;
    }

    // If primary keys are equal, compare by secondary key
    if (a.time !== b.time) {
      return a.time < b.time ? 1 : -1;
    }

    // If both keys are equal, maintain original order
    return 0;})

}

export default sortScores;