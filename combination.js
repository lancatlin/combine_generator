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
        this.grouping = grouping
        this.filters = filters
        this.result = []
    }

    checkOverflow() {
        let result
        if (this.grouping) {
            // 組合
            if (this.repeating) result = factorial(this.n + this.k - 1) / (factorial(this.k) * factorial(this.n - 1)) 
            else result = factorial(this.n, this.k) / factorial(this.k)
        } else {
			// 重複排列
            if (this.repeating) result = Math.pow(this.n, this.k)
            else result = factorial(this.n, this.k)
        }
        console.log('時間複雜度:', result)
        if (result > max_cost) {
            throw Error(`${result} 超過運算上限： ${max_cost}`)
        }
    }

    execute() {
        this.checkOverflow()
        this.exhaustive(0, [])
    }

    exhaustive(counter, existing) {
        let begin = 0
        if (this.grouping && existing.length > 0) {
            begin = existing[existing.length - 1]
        }
        let end = this.n
        if (!this.repeating) {
            end -= counter
        }
        for (let i = begin; i < end; i++) {
            let child = existing.slice()
            child.push(i)
            if (counter < this.k-1) {
                this.exhaustive(counter + 1, child)
            } else {
                if (!this.repeating) {
                    child = this.transform(child)
                }
                if (this.filter(child)) {
                    this.result.push(child)
                }
            }
        }
    }

    transform(array) {
        let result = []
        let values = Array.from(Array(this.n).keys())
        for (let i of array) {
            result.push(values[i])
            values.splice(i, 1)
        }
        return result
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
