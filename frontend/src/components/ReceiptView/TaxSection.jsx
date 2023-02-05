import { Center, Switch, Td, Tr, useBreakpoint, HStack, Text, Spacer, Heading, Th } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { calculateTax, calculateTotal } from "../../api/commonFunctions";


export default function TaxSection({data}) {
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
                    <Td p={{base: 2, md: 5}}>
                        <Center>
                            Service Charge (%)
                        </Center>
                    </Td>
                    <Td p={{base: 2, md: 5}}>
                            <Center>{data.serviceCharge}</Center>
                    </Td>
                    <Td p={{base: 2, md: 5}}>
                        <Center align="center">
                            <Switch size="lg" isChecked={data.isServiceCharge} isDisabled/>
                        </Center>
                    </Td>
                </Tr>
                <Tr>
                    <Td p={{base: 2, md: 5}}>
                        <Center>
                            GST (%)
                        </Center>
                    </Td>
                    <Td p={{base: 2, md: 5}}>
                        <Center>{data.gst}</Center>
                    </Td>
                    <Td p={{base: 2, md: 5}}>
                        <Center align="center">
                            <Switch size="lg" isChecked={data.isGst} isDisabled/>
                        </Center>
                    </Td>
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
                </Tr>
            </>
        )
    }

    return (
        <>
            {
                data.isServiceCharge && 
                <Tr>
                    <Td p={{base: 2, md: 5}}>
                        <Center>
                            Service Charge (%)
                        </Center>
                    </Td>
                    <Td p={{base: 2, md: 5}}>
                        <Center>
                            {data.serviceCharge}    
                        </Center>
                    </Td>
                    {
                        taxAmount[0].map((val, idx) => {
                            return (
                                <Td key={idx}>
                                    <Center>
                                        ${val.toFixed(2)}
                                    </Center>
                                </Td>
                            )
                        })
                    }
                </Tr>
            }
            {
                data.isGst &&
                <Tr>
                    <Td p={{base: 2, md: 5}}>
                        <Center>
                            GST (%)
                        </Center>
                    </Td>
                    <Td p={{base: 2, md: 5}}>
                        <Center>
                            {data.gst}
                        </Center>
                    </Td>
                    {
                        taxAmount[1].map((val, idx) => {
                            return (
                                <Td key={idx}>
                                    <Center>
                                        ${val.toFixed(2)}
                                    </Center>
                                </Td>
                            )
                        })
                    }
                </Tr>
            }
            
            <Tr>
                <Td>
                    <Heading size="md" align="center">
                        Total
                    </Heading>
                </Td>
                {
                    total.map((val, idx) => {
                        return (
                            <Td key={idx}>
                                <Center>
                                    <Heading size="md">
                                        ${val.toFixed(2)}
                                    </Heading>
                                </Center>
                            </Td>
                        )
                    })
                }
            </Tr>
        </>
    )


}