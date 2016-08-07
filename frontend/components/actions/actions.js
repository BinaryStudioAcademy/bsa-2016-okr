let counter = 1;

export function test1() {
    const action = {
        type: "JUST_FOR_TEST1",
        message: "HELLO WORLD!"
    };
    return action;
}

export function test2() {
    const action = {
        type: "JUST_FOR_TEST2",
        counter: counter++
    };
    return action;
}