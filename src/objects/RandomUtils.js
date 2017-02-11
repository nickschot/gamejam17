/**
 * Created by lennart on 11/02/17.
 */
function roll (chance) {
    return (Math.random() <= chance);
}

function choose_in(start, end) {
    return start + Math.floor(Math.random() * (end - start));
}

export { roll, choose_in };
