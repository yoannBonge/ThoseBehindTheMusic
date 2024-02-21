const colors = {
  music: "#5854DB",
  cinema: "#FBA40A",
  videogame: "#C90944",
};

export function getCategoryColor (category: string): string {
  switch (category) {
    case "music":
      return colors.music;
    case "cinema":
      return colors.cinema;
    case "videogame":
      return colors.videogame;
    default:
      return "#ffffff";
  }
};
