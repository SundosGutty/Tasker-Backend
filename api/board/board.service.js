const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const logger = require("../../services/logger.service");
const asyncLocalStorage = require('../../services/als.service')



async function query(filterBy = null) {
  try {
    const criteria = _buildCriteria(filterBy);
    const sortCriteria = _buildSortCriteria(filterBy);
    const collection = await dbService.getCollection("board");
    var boards = await collection.find(criteria).sort(sortCriteria).toArray();
    return boards;
  } catch (err) {
    logger.error("cannot find boards", err);
    throw err;
  }
}

async function remove(boardId) {
  try {
    const collection = await dbService.getCollection('board')
    const criteria = { _id: ObjectId(boardId) }
    await collection.deleteOne(criteria)
  } catch (err) {
    logger.error(`cannot remove board ${boardId}`, err)
    throw err
  }
}


async function add(board) {
  try {
    const collection = await dbService.getCollection('board')
    var currBoard = await collection.insertOne(board)
    return board;
  } catch (err) {
    logger.error('cannot insert board', err)
    throw err
  }
}

async function update(board) {
  try {
    var id = ObjectId(board._id);
    delete board._id;
    const collection = await dbService.getCollection("board");
    await collection.updateOne({ _id: id }, { $set: { ...board } });
    board._id = id
    return board;
  } catch (err) {
    logger.error(`cannot update board ${board}`, err);
    throw err;
  }
}

async function getById(boardId) {
  try {
    const collection = await dbService.getCollection("board");
    const board = collection.findOne({ _id: ObjectId(boardId) });
    return board;
  } catch (err) {
    logger.error(`while finding board ${boardId}`, err);
    throw err;
  }
}



function _buildCriteria(filterBy) {
  console.log(filterBy)
  const criteria = {};
  if (filterBy.searchKey) {
    const regex = new RegExp(filterBy.searchKey, "i");
    criteria.name = { $regex: regex };
  }
  return criteria;
}



function _buildSortCriteria(filterBy) {
  const sortCriteria = {};
  if (filterBy.sort === "Name") sortCriteria.name = 1;
  else if (filterBy.sort === "Price") sortCriteria.price = -1;
  else sortCriteria.createAt = 1;

  return sortCriteria;
}

// createBoard()
async function createBoard() {
  const collection = await dbService.getCollection('board')
  const id = ObjectId("61ae5ac3ac14464cd8b38e5b")
  // var currBoard = await collection.updateOne({ _id: id },{$set:{
  var currBoard = await collection.insertOne(
    {
      "title": "Sprint 4",
      "createdAt": 1589983468418.0,
      "description": "Track your action items and improve for next sprint",
      "createdBy": {
        "_id": "u101",
        "fullname": "Guy Shapira",
        "imgUrl": "guy-img.jpg"
      },
      "style": {},
      "labels": [
        {
          "id": "l101",
          "title": "Done",
          "color": "#61bd4f"
        }
      ],
      "members": [
        {
          "username": "Sundos",
          "_id": '61b246112e8f89202bd83308',
          "password": 12345,
          "fullname": "Sundos Gutty",
          "email": "sundos@gmail.com",
          "imgUrl": "sundos-img.jpg"
        },
        {
          "username": "Ishay",
          "_id": "61b245d82e8f89202bd83307",
          "password": 12345,
          "fullname": "Ishay Nitzan",
          "email": "sundos@gmail.com",
          "imgUrl": "ishay-img.jpeg"
        }
      ],
      "groups": [
        {
          "id": "g101",
          "title": "Team Tom",
          "tasks": [
            {
              "id": "t102",
              "title": "Make test data",
              "status": "Done",
              "members": [
                {
                  "username": "Sundos",
                  "password": 12345,
                  "fullname": "Sundos Gutty",
                  "email": "sundos@gmail.com",
                  "imgUrl": "sundos-img.jpg"
                }
              ],
              "priority": "High",
              "timeline": [
                "2021-12-05T22:00:00.000Z",
                "2021-12-08T22:00:00.000Z"
              ]
            },
            {
              "id": "t101",
              "title": "Send the prototype project",
              "status": "Work",
              "description": "description",
              "comments": [],
              "priority": "Medium",
              "members": [
                {
                  "username": "Sundos",
                  "password": 12345,
                  "fullname": "Sundos Gutty",
                  "email": "sundos@gmail.com",
                  "imgUrl": "sundos-img.jpg"
                }
              ],
              "timeline": [
                "2021-12-10T22:00:00.000Z",
                "2021-12-13T22:00:00.000Z"
              ]
            },
            {
              "id": "t103",
              "title": "Improve connectable",
              "status": "Done",
              "members": [
                {
                  "_id": "u101",
                  "username": "Ishay",
                  "fullname": "Ishay Nitzan",
                  "imgUrl": "ishay-img.jpeg"
                }
              ],
              "priority": "Low",
              "timeline": [
                "2021-12-10T22:00:00.000Z",
                "2021-12-14T22:00:00.000Z"
              ]
            },
            {
              "id": "8NeM9",
              "title": "add the new cover",
              "prioraty": null,
              "status": "Work",
              "timeline": [
                "2021-12-12T22:00:00.000Z",
                "2021-12-16T22:00:00.000Z"
              ],
              "members": null,
              "priority": "High"
            }
          ],
          "style": {
            "color": "#579bfc"
          }
        },
        {
          "id": "g102",
          "title": "Design Team",
          "tasks": [
            {
              "id": "t104",
              "title": "Finalize project",
              "status": "Done",
              "members": [
                {
                  "_id": "u101",
                  "username": "Ishay",
                  "fullname": "Ishay Nitzan",
                  "imgUrl": "ishay-img.jpeg"
                }
              ],
              "priority": "Low",
              "timeline": [
                "2021-11-30T22:00:00.000Z",
                "2021-12-06T22:00:00.000Z"
              ]
            },
            {
              "id": "t201",
              "title": "Change color plate for logo",
              "status": "Stuck",
              "priority": "Medium",
              "timeline": [
                "2021-12-07T22:00:00.000Z",
                "2021-12-10T22:00:00.000Z"
              ]
            },
            {
              "id": "t202",
              "title": "Recruit new members",
              "status": "Work",
              "priority": "High",
              "timeline": [
                "2021-12-10T22:00:00.000Z",
                "2021-12-13T22:00:00.000Z"
              ]
            }
          ],
          "style": {
            "color": "#579bfc"
          }
        },
        {
          "id": "g103",
          "title": "Marketing Team",
          "tasks": [
            {
              "id": "t301",
              "title": "make new spreadsheet",
              "status": "Done",
              "members": [
                {
                  "_id": "u102",
                  "username": "Sundos",
                  "fullname": "Sundos Gutty",
                  "imgUrl": "sundos-img.jpg"
                },
                {
                  "_id": "u103",
                  "username": "Ishay",
                  "fullname": "Ishay Nitzan",
                  "imgUrl": "ishay-img.jpeg"
                }
              ],
              "timeline": [
                "2021-12-11T22:00:00.000Z",
                "2021-12-14T22:00:00.000Z"
              ],
              "priority": "High"
            },
            {
              "id": "t402",
              "title": "Contact NY base for leads",
              "description": "description",
              "comments": [],
              "checklists": [
                {
                  "id": "YEhmF",
                  "title": "Checklist",
                  "todos": [
                    {
                      "id": "212jX",
                      "title": "To Do 1",
                      "isDone": false
                    }
                  ]
                }
              ],
              "members": [],
              "status": "Work",
              "createdAt": 1590999730348.0,
              "dueDate": 16156215211.0,
              "byMember": {
                "_id": "u101",
                "username": "Guy",
                "fullname": "Guy Shapira",
                "imgUrl": "guy-img.jpg"
              },
              "style": {},
              "timeline": [
                "2021-12-12T22:00:00.000Z",
                "2021-12-17T22:00:00.000Z"
              ],
              "priority": "Medium"
            }
          ],
          "style": {
            "color": "#579bfc"
          }
        },
        {
          "id": "g104",
          "title": "Office General",
          "tasks": [
            {
              "id": "501",
              "title": "The coffee machine is great!",
              "status": "Done",
              "members": [
                {
                  "_id": "u102",
                  "username": "Sundos",
                  "fullname": "Sundos Gutty",
                  "imgUrl": "sundos-img.jpg"
                },
                {
                  "_id": "u103",
                  "username": "Ishay",
                  "fullname": "Ishay Nitzan",
                  "imgUrl": "ishay-img.jpeg"
                }
              ],
              "timeline": [
                "2021-12-06T22:00:00.000Z",
                "2021-12-09T22:00:00.000Z"
              ],
              "priority": "Medium"
            },
            {
              "id": "t502",
              "title": "Water the plants",
              "description": "description",
              "comments": [],
              "checklists": [
                {
                  "id": "YEhmF",
                  "title": "Checklist",
                  "todos": [
                    {
                      "id": "212jX",
                      "title": "To Do 1",
                      "isDone": false
                    }
                  ]
                }
              ],
              "members": [
                {
                  "username": "Ishay",
                  "password": 12345,
                  "fullname": "Ishay Nitzan",
                  "email": "sundos@gmail.com",
                  "imgUrl": "ishay-img.jpeg"
                }
              ],
              "status": "Done",
              "createdAt": 1590999730348.0,
              "dueDate": 16156215211.0,
              "byMember": {
                "_id": "u101",
                "username": "Guy",
                "fullname": "Guy Shapira",
                "imgUrl": "guy-img.jpg"
              },
              "style": {},
              "timeline": [
                "2021-12-08T22:00:00.000Z",
                "2021-12-11T22:00:00.000Z"
              ]
            }
          ],
          "style": {
            "color": "#579bfc"
          }
        },
        {
          "id": "g105",
          "title": "Back Office",
          "tasks": [
            {
              "id": "601",
              "title": "Send fiscal quarter",
              "status": "Done",
              "members": [
                {
                  "_id": "u102",
                  "username": "Sundos",
                  "fullname": "Sundos Gutty",
                  "imgUrl": "sundos-img.jpg"
                },
                {
                  "_id": "u103",
                  "username": "Ishay",
                  "fullname": "Ishay Nitzan",
                  "imgUrl": "ishay-img.jpeg"
                }
              ],
              "priority": "Low"
            },
            {
              "id": "t602",
              "title": "Get server up and running",
              "description": "description",
              "comments": [],
              "checklists": [
                {
                  "id": "YEhmF",
                  "title": "Checklist",
                  "todos": [
                    {
                      "id": "212jX",
                      "title": "To Do 1",
                      "isDone": false
                    }
                  ]
                }
              ],
              "members": [
                {
                  "username": "Sundos",
                  "password": 12345,
                  "fullname": "Sundos Gutty",
                  "email": "sundos@gmail.com",
                  "imgUrl": "sundos-img.jpg"
                }
              ],
              "status": "Done",
              "createdAt": 1590999730348.0,
              "dueDate": 16156215211.0,
              "byMember": {
                "_id": "u101",
                "username": "Guy",
                "fullname": "Guy Shapira",
                "imgUrl": "guy-img.jpg"
              },
              "style": {}
            }
          ],
          "style": {
            "color": "#579bfc"
          }
        }
      ],
      "cmpsOrder": [
        "title-picker",
        "status-picker",
        "priority-picker",
        "member-picker",
        "timeline-picker"
      ]
    }
  )
}


module.exports = {
  query,
  remove,
  getById,
  update,
  add
}




