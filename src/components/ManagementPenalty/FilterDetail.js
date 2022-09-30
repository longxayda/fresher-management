import { useEffect, useState } from 'react';
import penaltyService from 'services/fresherManagement/penaltyService';
function FilterDetail({userId, onGetData}) {

    const [monthList, setMonthList] = useState([]);

    const changeMonth = (month) =>{
        let m = month.split('-');
        const result = m[1] + '/' + m[0];
        return result;
    }
    
    useEffect(async () => {
        const fetchMonth = async () => {
            const res = await penaltyService.getMonth(userId);
            const arrMonth = res.data.month_list.map(item => (changeMonth(item.month)));
            return arrMonth;
        };

        try {
            const months = await fetchMonth();
            setMonthList(months);
        }
        catch {
            setMonthList([])
        }
    }, [])

    const handleChangeMonth = (e) => {
        onGetData(e.target.value);
    }

    return (
        <>
            <div className="flexCenter">
                <div style={{fontSize:"20px", marginLeft: "9px"}} ><b>Month:</b></div>
                <div className="dropdown-penalty-class" style={{marginLeft: "9px"}}>
                    <select
                        className="form-select selectPenalty"
                        defaultValue=""
                        onClick={e => e.stopPropagation()}
                        onChange={e => handleChangeMonth(e)}>
                        <option value="">All</option>
                        {monthList.map((monthList, index) => (
                            <option
                                key={index} 
                                value={monthList}
                                className="dropdown-content dropdown-item"
                            >{monthList}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

export default FilterDetail;