import { useState } from "react"
import { Input, Button } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import '../css/style.scss'
import axios from "axios"
import { PriceList } from "../types/interface"

function Home() {
    const [priceList, setPriceList] = useState<PriceList>({
        'first_price': '',
        'first_price_minus': '',
        'first_price_plus': '',
        'second_price_1': '',
        'second_price_2': '',
        'second_price_3': '',
        'last_two': ''
    });
    const [msg, setMsg] = useState<string>('');
    const [isActive, setActive] = useState<boolean>(true);
    const [isCalculate, setCalculate] = useState<boolean>(false);
    const [isWin, setWin] = useState<boolean>(false);

    const handlePriceList = async () => {
        const config = {
            method: 'GET',
            url: `${import.meta.env.VITE_API}/price`,
            headers: {
                'api_key': `${import.meta.env.VITE_API_KEY}`
            }
        }

        try {
            const res = await axios(config);
            setActive(false);
            setPriceList(res.data.data.lists)
        }
        catch (e) {
            setActive(true);
            console.log('api error /price')
        }
    }

    let getPriceByNumber = (numbers: string) => {
        const num = numbers;
        const decim_1 = num[1];
        const decim_2 = num[2];
        const newDecim = decim_1 + decim_2;

        const find_max_price = Object.keys(priceList).find(key => priceList[key as keyof typeof priceList] === num);
        const find_min_price = Object.keys(priceList).find(key => priceList[key as keyof typeof priceList] === newDecim);
        //console.log('max_price==========', find_max_price);
        //console.log('min_price==========', find_min_price);

        setCalculate(false)

        // double price case
        if (find_max_price === "first_price" && find_min_price === "last_two") {
            setWin(true);
            return setMsg(numbers + ' ยินดีด้วย คุณถูกรางวัลที่ 1 และถูกรางวัลเลขท้าย 2 ตัว')
        }
        if ((find_max_price === "first_price_minus" && find_min_price === "last_two") ||
            (find_max_price === "first_price_plus" && find_min_price === "last_two")) {
            setWin(true);
            return setMsg(numbers + ' ยินดีด้วย คุณถูกรางวัลเลขใกล้เคียงรางวัลที่ 1 และถูกรางวัลเลขท้าย 2 ตัว')
        }
        if ((find_max_price === "second_price_1" && find_min_price === "last_two") ||
            (find_max_price === "second_price_2" && find_min_price === "last_two") ||
            (find_max_price === "second_price_3" && find_min_price === "last_two")) {
            setWin(true);
            return setMsg(numbers + ' ยินดีด้วย คุณถูกรางวัลที่ 2 และถูกรางวัลเลขท้าย 2 ตัว')
        }

        //one price case
        if (find_max_price === "first_price") {
            setWin(true);
            return setMsg(numbers + ' ยินดีด้วย คุณถูกรางวัลที่ 1')
        }
        if ((find_max_price === "first_price_minus") || (find_max_price === "first_price_plus")) {
            setWin(true);
            return setMsg(numbers + ' ยินดีด้วย คุณถูกรางวัลเลขใกล้เคียงรางวัลที่ 1')
        }
        if ((find_max_price === "second_price_1") ||
            (find_max_price === "second_price_2") ||
            (find_max_price === "second_price_3")) {
            setWin(true);
            return setMsg(numbers + ' ยินดีด้วย คุณถูกรางวัลที่ 2')
        }
        if (find_min_price === "last_two") {
            setWin(true);
            return setMsg(numbers + ' ยินดีด้วย คุณถูกรางวัลเลขท้าย 2 ตัว')
        }
        else {
            setWin(false);
            return setMsg(numbers + ' คุณไม่ถูกรางวัลใดๆ')
        }


        //console.log(Object.keys(lists).find(key => lists[key as keyof typeof lists] === num));
        //console.log(Object.keys(lists).find(key => lists[key as keyof typeof lists] === newDecim));
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numbers = e.target.value.replace(/[^0-9]/g, '')
        if (numbers.length === 3) {
            setCalculate(true);
            getPriceByNumber(numbers);
        } else {
            setMsg('');
        }
    }

    return (
        <div className="App">
            <main className="home__main m-auto">
                <h1 className="text-3xl pt-8 pb-8 text-center bg-gray-800 text-cyan-400">รางวัลล็อตเตอรี่ Lucky</h1>
                <section className="p-3">
                    <p className="text-xl text-center"><b>ผลการออกรางวัลล็อตเตอรี่ Lucky</b></p>
                    <br />
                    <Button onClick={handlePriceList} style={{ display: 'block', margin: '0 auto' }} color='yellow' content='สุ่มรางวัล' />
                    <div className="bg-white py-2">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="wrapper">
                                <div className="one text-2xl pt-8 bg-gray-800 text-white">รางวัลที่ 1</div>
                                <div className="two text-2xl pt-8">{priceList.first_price}</div>
                                <div className="three text-lg pt-8 bg-gray-800 text-white">รางวัลเลขข้างเคียงรางวัลที่ 1</div>
                                <div className="four text-2xl pt-8">{priceList.first_price_minus}</div>
                                <div className="five text-2xl pt-8">{priceList.first_price_plus}</div>
                                <div className="six text-xl pt-8 bg-gray-800 text-white">รางวัลที่ 2</div>
                                <div className="seven text-2xl pt-8">{priceList.second_price_1}</div>
                                <div className="eight text-2xl pt-8">{priceList.second_price_2}</div>
                                <div className="nine text-2xl pt-8">{priceList.second_price_3}</div>
                                <div className="ten text-xl pt-8 bg-gray-800 text-white">รางวัลเลขท้าย 2 ตัว</div>
                                <div className="eleven text-2xl pt-8">{priceList.last_two}</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="p-3 text-center">
                    <p className="text-lg pt-2 pb-2 bg-cyan-400 text-gray-100"><b>ตรวจรางวัลล็อตเตอรี่</b></p>
                    <br />
                    <p><i>ระบบจะตรวจรางวัลอัตโนมัตเมื่อกรอกครบ 3 ตัว</i></p>
                    <br />
                    <label className="text-lg font-bold">เลขล็อตเตอรี่ </label>
                    <Input onChange={handleInput} loading={isCalculate} disabled={isActive} label={{ icon: 'asterisk' }}
                        labelPosition='left corner' maxLength={3} placeholder='909' />
                    <p className={isWin ? 'text-green-600' : 'text-red-600'}><b className="pt-4 pb-4 text-lg text-center">{msg} &#160;</b></p>
                </section>
            </main>
        </div>
    )
}

export default Home