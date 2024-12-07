function sortDataById(data: any[]) {
  return data.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) {
      return 1;
    }

    return 0;
  });
}

export default sortDataById;
