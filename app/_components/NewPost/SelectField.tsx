import React from "react";

type Props = {
    labelText: string;
    optionValues: Array<any>;
    changeHandler: React.ChangeEventHandler<HTMLSelectElement> | undefined;
};

const SelectField = ({ labelText, optionValues, changeHandler }: Props) => {
    return (
        <>
            <label className="text-md font-medium ">{labelText}</label>
            <select
                onChange={changeHandler}
                className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
            >
                {optionValues.map((item) => (
                    <option
                        key={item.name}
                        className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                        value={item.name}
                    >
                        {item.name}
                    </option>
                ))}
            </select>
        </>
    );
};

export default SelectField;
