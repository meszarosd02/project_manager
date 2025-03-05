export default function CircularProgressBar({currentValue, maxValue} : {currentValue: number, maxValue: number}){
    return (
        <>
            <div className="flex justify-center align-center w-[50%] h-[50%] overflow-auto">
                <svg viewBox="0 0 100 100" width={"100%"} height={"100%"}>
                    <circle
                    cx={50}
                    cy={50}
                    r={40}
                    fill="none"
                    stroke="#ddd"
                    strokeWidth={20}
                    />
                </svg>
            </div> 
        </>
    );
}