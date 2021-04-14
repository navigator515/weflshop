const interest =[

    {
        "_id":1,
        "name":"친환경"
    },
    {
        "_id":2,
        "name":"유기동물"
    },
    {
        "_id":3,
        "name":"비건"
    },
    {
        "_id":4,
        "name":"취약계층"
    },
   

]


const area=[

    {
        "_id":0,
        "name":"Any",
        "array":[]
    },
    {
        "_id":1,
        "name":"서울",
        "array":[0, 199]
    },
    {
        "_id":2,
        "name":"부산",
        "array":[200,249]
    },
    {
        "_id":3,
        "name":"인천",
        "array":[250,279]
    },
    {
        "_id":4,
        "name":"경기도",
        "array":[280,299]
    },
    {
        "_id":5,
        "name":"Any",
        "array":[300,1500000]
    },

]

export {
    interest,
    area
}