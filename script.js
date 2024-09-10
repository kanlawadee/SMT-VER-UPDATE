const lockPrice = 45.0;
const stockPrice = 30.0;
const barrelPrice = 25.0;

let totalLocks = 0;
let totalStocks = 0;
let totalBarrels = 0;

document.getElementById('add-sale').addEventListener('click', addSale);
document.getElementById('calculate').addEventListener('click', calculateCommission);

function addSale() {
    const locksInput = document.getElementById('locks');
    const stocksInput = document.getElementById('stocks');
    const barrelsInput = document.getElementById('barrels');

    const locks = parseFloat(locksInput.value);
    const stocks = parseFloat(stocksInput.value);
    const barrels = parseFloat(barrelsInput.value);

    if (validateInputs(locksInput.value, stocksInput.value, barrelsInput.value)) {
        if (validateRange(locks, stocks, barrels)) {
            totalLocks += Math.floor(locks);
            totalStocks += Math.floor(stocks);
            totalBarrels += Math.floor(barrels);

            alert('เพิ่มการขายสำเร็จแล้ว! \nล็อคที่ขาย: ' + totalLocks + '\nสต็อคที่ขาย: ' + totalStocks + '\nบาร์เรลที่ขาย: ' + totalBarrels);
            clearInputs();
        }
    }
}

function calculateCommission() {
    const resultsDiv = document.getElementById('results');

    const lockSales = lockPrice * totalLocks;
    const stockSales = stockPrice * totalStocks;
    const barrelSales = barrelPrice * totalBarrels;
    const sales = lockSales + stockSales + barrelSales;

    let commission = 0.0;

    if (sales > 1800.0) {
        commission = (0.10 * 1000) + (0.15 * 800) + (0.20 * (sales - 1800));
    } else if (sales > 1000.0) {
        commission = (0.10 * 1000) + (0.15 * (sales - 1000));
    } else {
        commission = 0.10 * sales;
    }

    resultsDiv.innerHTML = `
        <div class="result-item">ล็อคที่ขาย: ${totalLocks}</div>
        <div class="result-item">สต็อคที่ขาย: ${totalStocks}</div>
        <div class="result-item">บาร์เรลที่ขาย: ${totalBarrels}</div>
        <div class="result-item">💰 ยอดขายทั้งหมด: $${sales.toFixed(2)}</div>
        <div class="result-item">🏆 ค่าคอมมิชชั่น: $${commission.toFixed(2)}</div>
    `;

    resetTotals();
}

function validateInputs(locks, stocks, barrels) {
    let message = '';

    // ตรวจสอบค่าว่าง
    if (locks === '' || locks === null) {
        message += 'Error: จำนวนล็อคไม่สามารถเป็นค่าว่างได้.\n';
    }
    if (stocks === '' || stocks === null) {
        message += 'Error: จำนวนสต็อคไม่สามารถเป็นค่าว่างได้.\n';
    }
    if (barrels === '' || barrels === null) {
        message += 'Error: จำนวนบาร์เรลไม่สามารถเป็นค่าว่างได้.\n';
    }

    if (message) {
        alert('เกิดข้อผิดพลาดในการป้อนข้อมูล:\n' + message);
        return false;
    }

    return true;
}

function validateRange(locks, stocks, barrels) {
    let message = '';

    // ตรวจสอบค่าที่กรอก
    if (!Number.isInteger(locks) || locks < 1 || locks > 70) {
        message += 'Out of range: จำนวนล็อคต้องเป็นจำนวนเต็มและอยู่ในช่วง 1 ถึง 70.\n';
    }

    if (!Number.isInteger(stocks) || stocks < 1 || stocks > 80) {
        message += 'Out of range: จำนวนสต็อคต้องเป็นจำนวนเต็มและอยู่ในช่วง 1 ถึง 80.\n';
    }

    if (!Number.isInteger(barrels) || barrels < 1 || barrels > 90) {
        message += 'Out of range: จำนวนบาร์เรลต้องเป็นจำนวนเต็มและอยู่ในช่วง 1 ถึง 90.\n';
    }

    if (message) {
        alert('เกิดข้อผิดพลาดในการป้อนข้อมูล:\n' + message);
        return false;
    }

    return true;
}

function clearInputs() {
    document.getElementById('locks').value = '';
    document.getElementById('stocks').value = '';
    document.getElementById('barrels').value = '';
}

function resetTotals() {
    totalLocks = 0;
    totalStocks = 0;
    totalBarrels = 0;
}
