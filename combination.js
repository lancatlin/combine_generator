const max_result = 100000
function main() {
    let n = Number(document.getElementById("n").value)
    let k = Number(document.getElementById("k").value)
    let repeated = true
    let result = exhaustive(n, k, repeated)
    document.getElementById("area").value = toString(result)
    document.getElementById("result").value = result.length
}

function toString(rows) {
    let result = []
    for (let row of rows) {
        result.push(row.join(""))
    }
    return result
}

function exhaustive(n, k, repeated) {
    if (Math.pow(n, k) > max_result) {
        alert(`超過最大值:${max_result}`)
        return
    }
    if (repeated) {
        var result = []
        exhaustive_repeated(k, [])
        return result
    }

    function exhaustive_repeated(k, existing) {
        if (k == 0) {
            result.push(existing)
            return
        }
        for (let i = 0; i < n; i++) {
            let child = existing.slice()
            child.push(i)
            exhaustive_repeated(k-1, child)
        }
    }
}
