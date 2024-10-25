import fs from "fs/promises"

let files = await fs.readdir("../tsv")

let classes = []

function parseNum(value) {
  if (value === "") return 0
  return parseInt(value)
}

for (let file of files) {
  let content = await fs.readFile("../tsv/" + file, "utf8")
  let lines = content.split("\r\n").slice(1)
  for (let line of lines) {
    let split = line.split("\t")
    let data = {
      class: split[0],
      title: split[1],
      instructors: split[2].split("; "),
      term: split[3],
      termCode: parseInt(split[4]),
      crossListed: split[5] == "Y",
      gradeCounts: {
        "A+": parseNum(split[6]),
        "A": parseNum(split[7]),
        "A-": parseNum(split[8]),
        "B+": parseNum(split[9]),
        "B": parseNum(split[10]),
        "B-": parseNum(split[11]),
        "C+": parseNum(split[12]),
        "C": parseNum(split[13]),
        "C-": parseNum(split[14]),
        "D+": parseNum(split[15]),
        "D": parseNum(split[16]),
        "D-": parseNum(split[17]),
        "F": parseNum(split[18]),
        "P": parseNum(split[19]),
        "NP": parseNum(split[20]),
        "S": parseNum(split[21]),
        "U": parseNum(split[22]),
        "I": parseNum(split[23]),
        "W": parseNum(split[24]),
        "-": parseNum(split[25])
      },
      students: parseNum(split[26])
    }
    classes.push(data)
  }
}

let termOrdering = [
  "2019 Fall Quarter",
  "2020 Winter Quarter",
  "2020 Spring Quarter",
  "2020 Summer Quarter",
  "2020 Fall Quarter",
  "2021 Winter Quarter",
  "2021 Spring Quarter",
  "2021 Summer Quarter",
  "2021 Fall Quarter",
  "2022 Winter Quarter",
  "2022 Spring Quarter",
  "2022 Summer Quarter",
  "2022 Fall Quarter",
  "2023 Winter Quarter",
  "2023 Spring Quarter",
  "2023 Summer Quarter",
  "2023 Fall Quarter",
  "2024 Winter Quarter",
  "2024 Spring Quarter",
]

classes.sort((a, b) => {
  if (a.class > b.class) {
    return 1
  } else if (a.class < b.class) {
    return -1
  } else return termOrdering.indexOf(a.term) - termOrdering.indexOf(b.term)
})

await fs.writeFile("../data.json", JSON.stringify(classes, null, 2))