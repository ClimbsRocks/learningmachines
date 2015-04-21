CREATE TABLE IF NOT EXISTS random_forest (
        passengerId int,
        survived int,
        pClass int,
        passenger varchar (65),
        sex varchar (7),
        age int,
        siblings int,
        parents int,
        ticket varchar (18),
        fare float,
        cabin varchar (15),
        embarked varchar(1),
        PRIMARY KEY (passengerId)
);