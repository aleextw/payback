import { Center, Input, Switch, Th, Tr, useBreakpoint, HStack, Text, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { calculateTax, calculateTotal } from "../../api/commonFunctions";


function updatePercentage(fieldName, value, data, setData) {
    if (!isNaN(value) && value >=0 && value <= 100) {
        setData({...data, [fieldName]: value});
    }
}


export default function TaxSection({data, setData}) {
    const breakpoint = useBreakpoint();
    const [taxAmount, setTaxAmount] = useState(calculateTax(data));
    const [total, setTotal] = useState(calculateTotal(data));
    useEffect(() => {
        setTaxAmount(calculateTax(data));
        setTotal(calculateTotal(data));
    }, [data]);

    if (breakpoint === "base") {
        return (
            <>
                <Tr>
                    <Th p={{base: 2, md: 5}}>
                        Service Charge (%)
                    </Th>
                    <Th p={{base: 2, md: 5}}>
                            <Input size="sm" placeholder="%" value={data.serviceCharge} onChange={(e) => updatePercentage("serviceCharge", e.target.value, data, setData)}/>

                    </Th>
                    <Th p={{base: 2, md: 5}}>
                        <Center align="center">
                            <Switch size="lg" isChecked={data.isServiceCharge} onChange={(e) => setData({...data, isServiceCharge: !data.isServiceCharge})}/>
                        </Center>
                    </Th>
                    <Th />
                </Tr>
                <Tr>
                    <Th p={{base: 2, md: 5}}>
                        GST (%)
                    </Th>
                    <Th p={{base: 2, md: 5}}>
                            <Input size="sm" placeholder="%" value={data.gst} onChange={(e) => updatePercentage("gst", e.target.value,  data, setData)}/>
                    </Th>
                    <Th p={{base: 2, md: 5}}>
                        <Center align="center">
                            <Switch size="lg" isChecked={data.isGst} onChange={(e) => setData({...data, isGst: !data.isGst})}/>
                        </Center>
                    </Th>
                    <Th />
                </Tr>
                
                <Tr>
                    <Th colSpan={100}>
                        <Center align="center">
                            Total:
                        </Center>
                    </Th>
                </Tr>
                
                <Tr>
                    <Th p={{base: 2, md: 5}}>
                        <Center>
                            Name
                        </Center>
                    </Th>
                    <Th p={{base: 2, md: 5}}>
                        <Center>
                            Tax
                        </Center>
                    </Th>
                    <Th p={{base: 2, md: 5}}>
                        <Center>
                            Total
                        </Center>
                    </Th>
                    <Th />
                </Tr>
                {
                    taxAmount[0].map((val, idx) => {
                        return (
                            <Tr key={idx}>
                                <Th p={{base: 2, md: 5}}>
                                    <Center>
                                        {data.people[idx]}
                                    </Center>
                                </Th>
                                <Th p={{base: 2, md: 5}}>
                                    <Center>
                                        ${(val + taxAmount[1][idx]).toFixed(2)}
                                    </Center>
                                </Th>
                                <Th p={{base: 2, md: 5}}>
                                    <Center>
                                        ${total[idx+1].toFixed(2)}
                                    </Center>
                                </Th>
                                <Th />
                            </Tr>
                        )
                    })
                }

                <Tr>
                    <Th/>
                    <Th p={{base: 2, md: 5}}>
                        <Center>
                            ${(taxAmount[0].reduce((a, b) => a + b, 0) + taxAmount[1].reduce((a, b) => a + b, 0)).toFixed(2)}
                        </Center>
                    </Th>
                    <Th p={{base: 2, md: 5}}>
                        <Center>
                            ${total[0].toFixed(2)}
                        </Center>
                    </Th>
                    <Th/>
                </Tr>

            </>
        )
    }

    return (
        <>
            <Tr>
                <Th p={{base: 2, md: 5}}>
                    <HStack>
                        <Text>
                            Service Charge (%)
                        </Text>
                        <Spacer />
                        <Center align="center">
                            <Switch size="lg" isChecked={data.isServiceCharge} onChange={(e) => setData({...data, isServiceCharge: !data.isServiceCharge})}/>
                        </Center>
                    </HStack>
                </Th>
                <Th p={{base: 2, md: 5}}>
                        <Input size="sm" placeholder="%" value={data.serviceCharge} onChange={(e) => updatePercentage("serviceCharge", e.target.value, data, setData)}/>
                </Th>
                {
                    taxAmount[0].map((val, idx) => {
                        return (
                            <Th key={idx}>
                                <Center>
                                    ${val.toFixed(2)}
                                </Center>
                            </Th>
                        )
                    })
                }
                <Th/>
            </Tr>
            <Tr>
                <Th p={{base: 2, md: 5}}>
                    <HStack>
                        <Text>
                            GST (%)
                        </Text>
                        <Spacer />
                        <Center align="center">
                            <Switch size="lg" isChecked={data.isGst} onChange={(e) => setData({...data, isGst: !data.isGst})}/>
                        </Center>
                    </HStack>
                </Th>
                <Th p={{base: 2, md: 5}}>
                        <Input size="sm" placeholder="%" value={data.gst} onChange={(e) => updatePercentage("gst", e.target.value, data, setData)}/>
                </Th>
                {
                    taxAmount[1].map((val, idx) => {
                        return (
                            <Th key={idx}>
                                <Center>
                                    ${val.toFixed(2)}
                                </Center>
                            </Th>
                        )
                    })
                }
                <Th/>
            </Tr>
            <Tr>
                <Th>
                    <Text>
                        Total
                    </Text>
                </Th>
                {
                    total.map((val, idx) => {
                        return (
                            <Th key={idx}>
                                <Center>
                                    ${val.toFixed(2)}
                                </Center>
                            </Th>
                        )
                    })
                }
                <Th/>
            </Tr>
        </>
    )


}