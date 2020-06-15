const max_result = 10000000

function main() {
    let n = Number(document.getElementById("n").value)
    let k = Number(document.getElementById("k").value)
    var filters = []
    if (!document.getElementById("repeated").checked) {
        filters.push(repeatingFilter)
    }
	if (document.getElementById("no_zero_begin").checked) {
		filters.push(zeroBeginFilter)
	}
	if (document.getElementById("combination").checked) {
		filters.push(combinationFilter)
	}
    if (document.getElementById("use_filter").checked) {
        try {
            filters.push(eval(document.getElementById('filter').value))
        } catch (e) {
            alert(e.message)
            return
        }
    }
    let result = exhaustive(n, k, filters)
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

function exhaustive(n, k, filters) {
    if (Math.pow(n, k) > max_result) {
        alert(`超過最大值:${max_result}`)
        return
    }
    var result = []
    exhaustive_operation(k, [])
    return result

    function exhaustive_operation(k, existing) {
        for (let i = 0; i < n; i++) {
            let child = existing.slice()
            child.push(i)
            if (k > 1) {
                exhaustive_operation(k - 1, child)
            } else {
                if (filter(child)) {
                    result.push(child)
                }
            }
        }
    }

    function filter(row) {
        for (let f of filters) {
            if (!f(row)) {
                return false
            }
        }
        return true
    }

}

function repeatingFilter(array) {
	return (new Set(array)).size === array.length;
}

function zeroBeginFilter(array) {
	return array[0] != 0
}

function combinationFilter(array) {
	for (let i = 0; i < array.length - 1; i++) {
		if (array[i] > array[i+1]) return false
	}
	return true
}
