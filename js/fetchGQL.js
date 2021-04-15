const fetchGraphql = async (query) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(query),
    };
    try {
        console.log("options", options)
        const response = await fetch('http://localhost:3000/graphql', options);
        // const response = await fetch('https://greeting.jelastic.metropolia.fi/graphql', options);
        const json = await response.json();
        return json.data;
    } catch (e) {
        console.log(e);
        return false;
    }
};

const addAnimal = async (message) => {
    console.log("ADD aniaml")
    const ADD_ANIMAL_MUTATION = {
        query: `
            mutation VariableTest($animalName: String!) {
                  addAnimal(animalName: $animalName, species: "6061a06623903420e0e53ed1") {
                      animalName  }
                      }`
        ,
        variables: message,
    };
    console.log("addAnimal Query", ADD_ANIMAL_MUTATION)
    const data = await fetchGraphql(ADD_ANIMAL_MUTATION);
    console.log("Adding Animal", data)
    return data.addAnimal;
};

const getAnimals = async () => {
    const query = {
        query: `
            {
              animals{
                animalName
              }
            }`
    };
    const data = await fetchGraphql(query);
    console.log("Getting animals", data)
    return data.animals;
};
