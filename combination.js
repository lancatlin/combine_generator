const max_cost = 1e8

function main() {
    let n = Number(document.getElementById("n").value)
    let k = Number(document.getElementById("k").value)
    var filters = []
    let repeating = document.getElementById("repeating").checked
	let grouping = document.getElementById("grouping").checked 
	if (document.getElementById("no_zero_begin").checked) {
		filters.push(zeroBeginFilter)
	}
    if (document.getElementById("use_filter").checked) {
        try {
            filters.push(eval(document.getElementById('filter').value))
        } catch (e) {
            alert(e.message)
            return
        }
    }
    let computer = new Computer(n, k, repeating, grouping, filters)
    try {
        computer.execute()
        document.getElementById("area").value = computer.allResult()
        document.getElementById("result").value = computer.resultNumber()
    } catch (error) {
        alert(error) 
    }
}

class Computer {
    constructor (n, k, repeating, grouping, filters) {
        this.n = n
        this.k = k
        this.repeating = repeating
		if (!repeating) {
			filters.unshift(repeatingFilter)
		}
        this.grouping = grouping
        this.filters = filters
        this.result = []
    }

    checkOverflow() {
        let result
        if (this.grouping) {
			// 組合
			result = factorial(this.n + this.k - 1) / (factorial(this.k) * factorial(this.n - 1))
        } else {
			// 重複排列
			result = Math.pow(this.n, this.k)
        }
        console.log('時間複雜度:', result)
        if (result > max_cost) {
            throw Error(`${result} 超過運算上限： ${max_cost}`)
        }
    }

    execute() {
        this.checkOverflow()
        this.exhaustive(this.k, [])
    }

    exhaustive(k, existing) {
        let begin = 0
        if (this.grouping && existing.length > 0) {
            begin = existing[existing.length - 1]
        }
        for (let i = begin; i < this.n; i++) {
            let child = existing.slice()
            child.push(i)
            if (k > 1) {
                this.exhaustive(k - 1, child)
            } else {
                if (this.filter(child)) {
                    this.result.push(child)
                }
            }
        }
    }

    filter(array) {
        for (let f of this.filters) {
            if (!f(array)) {
                return false
            }
        }
        return true
    }

    allResult() {
        let result = []
        for (let row of this.result) {
            result.push(row.join(""))
        }
        return result.join(" ")
    }

    resultNumber() {
        return this.result.length
    }
}

function factorial(n, k=n) {
    let result = 1
    for (let i = 0; i < k; i++) {
        result *= n - i
    }
    return result
}

function repeatingFilter(array) {
	return (new Set(array)).size === array.length;
}

function zeroBeginFilter(array) {
	return array[0] != 0
}
