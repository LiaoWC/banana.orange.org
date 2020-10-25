///////////////////////////////

INSERT INTO boards(boardname,userId) VALUES('Food Recommendation',1);
INSERT INTO boards(boardname,userId) VALUES('Exercise',1);
INSERT INTO boards(boardname,userId) VALUES('Technology Area',1);

INSERT INTO posts(boardId,title,authorId,date,content)
  VALUES (1,'What food do you recommend in Hsinchu?',1,'20201023','As the title said, who could recommend me some delicious food?');
INSERT INTO posts(boardId,title,authorId,date,content)
  VALUES (2,'How to get muscle efficiently?',1,'20201022','');
INSERT INTO posts(boardId,title,authorId,date,content)
  VALUES (3,'What do you think about the new Deep Learning algorithm?',1,'20201023','');
INSERT INTO posts(boardId,title,authorId,date,content)
  VALUES (3,'Last update of Ubuntu',1,'20201024','My Ubuntu crashed after I update!');
INSERT INTO posts(boardId,title,authorId,date,content)
  VALUES (3,'Who could help me solve this problem?',1,'20201024','......');

///////////////////////////////
// state 1

INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
1,1,'Build the environment.','11/13','Jason, Kevin');
INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
1,1,'Improve the search algorithm.','11/15','Leo, Amy');
INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
1,1,'Prepare for the next activity.','11/25','Joey, Kathy');
INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
1,1,'Help tech department to resolve some problems.','11/29','Mose, Kevin');

INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
1,0,'Finish the new project.','11/21','Mose, Jim');
INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
1,0,'Create an APP.','11/29','Ella, Carmen');

///// Todo

INSERT INTO todos(userId,state,content,deadline) VALUES(1,0,'Build the environment in docker.','10231800');
INSERT INTO todos(userId,state,content,deadline) VALUES(1,0,'Write a paper.','12052100');
INSERT INTO todos(userId,state,content,deadline) VALUES(1,0,'Deal with the pull request.','10260900');
INSERT INTO todos(userId,state,content,deadline) VALUES(1,0,'Prepare for the meeting.','10301000');



///////////////////////////////

CREATE TABLE boards(
    boardId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    boardname TEXT NOT NULL UNIQUE,
    userId INTEGER NOT NULL
)
CREATE TABLE posts(
    postId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    boardId INTEGER NOT NULL,
    title TEXT NOT NULL,
    authorId TEXT NOT NULL,
    date TEXT NOT NULL,
    content TEXT
)
CREATE TABLE comments(
    commentId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    postId INTEGER NOT NULL,
    userId TEXT NOT NULL,
    comment TEXT NOT NULL
)