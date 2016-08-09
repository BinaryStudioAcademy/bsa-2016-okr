
const initialState = {
    showObjectives: [{
    id: "000001",
    objTitle: "Take the Landmark Forum Training",
    category: "Knowledge",
    ownerName: "Walter Ahumada"    
},
{
    id: "000002",
    objTitle: "Create a dynamic coaching and training community with 50 or more members",
    category: "Knowledge",
    ownerName: "Lakeisha Breen"
   
}, {
    id: "000003",
    objTitle: "Receive the CPAE designation from the National Speakers Association",
    category: "Knowledge",
    ownerName: "Jayna Bhatti"
    
},
{
    id: "000004",
    objTitle: "Create a curriculum guide for a college course based on The Success Principles",
    category: "Knowledge",
    ownerName: "Parker Hohlt"
    
},
{
    id: "000005",
    objTitle: "Develop a leadership training",
    category: "Knowledge",
    ownerName: "Leana Bowley"
   
},
{
    id: "000006",
    objTitle: "Type 150 words a minute",
    category: "Knowledge",
    ownerName: "Neva April"    
},
{
    id: "000007",
    objTitle: "Give a talk to an audience of 10,000 people ",
    category: "Knowledge",
    ownerName: "Epifania Leo"
    
},
{
    id: "000008",
    objTitle: "Learn to speak Spanish fluently",
    category: "Knowledge",
    ownerName: "Nam Beaudin"
    
},
{
    id: "000009",
    objTitle: "position as a software tester ",
    category: "Knowledge",
    ownerName: "Luana Hack"
    
},
{
    id: "000010",
    objTitle: "Produce a PBS program",
    category: "Knowledge",
    ownerName: "Son Gossage"
    
}],
    search: ""
}
export default function patentDetailsReducer(state = initialState, action) {
    switch (action.type) {
        
        case 'REMOVE_OBJECTIVE': {
            const { showObjectives } = action
            return Object.assign({}, state, {
                showObjectives

            })
        }

        case 'SEARCH_OBJECTIVE': {
            const { search  } = action
            return Object.assign({}, state, {
                search
            })
        }
        
        default: {
            return state;
        }
    }
}
