startTime = performance.now();
async function fetchAllUsersDetailsParallelyWithStats() {
  let singleUsersDetailsPromises = [];
  for (name of ["nkgokul", "BrendanEich", "gaearon"]) {
    let promise = fetchSingleUsersDetailsWithStats(name);
    console.log(
      "Created Promise for API call of " + name + " at " + executingAt()
    );
    singleUsersDetailsPromises.push(promise);
  }
  console.log("Finished adding all promises at " + executingAt());
  let allUsersDetails = await Promise.all(singleUsersDetailsPromises);
  console.log("Got the results for all promises at " + executingAt());
  console.log(allUsersDetails);
}
async function fetchSingleUsersDetailsWithStats(name) {
  console.log("Starting API call for " + name + " at " + executingAt());
  userDetails = await fetch("https://api.github.com/users/" + name);
  userDetailsJSON = await userDetails.json();
  console.log("Finished API call for " + name + " at " + executingAt());
  return userDetailsJSON;
}
fetchAllUsersDetailsParallelyWithStats();