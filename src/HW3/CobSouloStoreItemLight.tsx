import React, { Component } from 'react';

import './CobSoulo.css';
import { Menu, Button, Icon, Image, Label, MenuItemProps, Segment, MenuItem, Dropdown, Input, MenuHeader, Message, Container, Divider, Card, SemanticCOLORS } from 'semantic-ui-react'
import { UserContext } from './CobSouloUserInfoContext';

interface Props {
    onBuyClick: (price: number, name: string, currency: string, action: () => void, imgSrc: string) => void
    name: string
    price: number
    imgSrc: string
    currency: string
    action: () => void
    sale: boolean
    saleRed: number
    dailyBonus?: boolean
    bonusDesc?: string
    bestValue?: boolean
    approxUSDDisplay: boolean
    alreadyOwn?:boolean
    
}

interface States {

}

class CobSouloStoreItemLight extends Component<Props, States> {
    static contextType = UserContext;
    constructor(props: Props) {
        super(props);
        this.state = {

        }
    }

    canPurchase(gold: number, silver: number, brass: number): boolean {

        if (this.props.currency === "gold") {
            return gold >= this.props.price;
        } else if ((this.props.currency === "silver")) {
            return silver >= this.props.price;
        } else if ((this.props.currency === "brass")) {
            return brass >= this.props.price;
        }
        return true;
    }

    render() {

        const { wealth, dailyRechargeDeal } = this.context;
        let c = '';
        let cp = '';
        let purchaseBtn = 'Trade'
        let buttonColor: SemanticCOLORS | "facebook" | "google plus" | "vk" | "twitter" | "linkedin" | "instagram" | "youtube" | undefined = 'violet'
        if (this.props.currency === 'usd') {
            c = '$';
            purchaseBtn = 'Buy Now'
            buttonColor = 'green'
        } else if (this.props.currency === 'gold') {
            cp = 'Gold';
        } else if (this.props.currency === 'silver') {
            cp = 'Silver';
        } else if (this.props.currency === 'brass') {
            cp = 'Brass';
        }
        let approxUSD;

        if (this.props.approxUSDDisplay) {

            if (this.props.currency === 'usd') {
                approxUSD = this.props.price;
            } else if (this.props.currency === 'gold') {
                approxUSD = this.props.price
            } else if (this.props.currency === 'silver') {
                approxUSD = (this.props.price / 5).toFixed(2)
            } else if (this.props.currency === 'brass') {
                approxUSD = (this.props.price / 20).toFixed(2)
            }
        }
        console.log(approxUSD);

        let unavailable = this.props.alreadyOwn || (!dailyRechargeDeal && this.props.dailyBonus);
        let unavailableText = "Unavailable"
        
        if(this.props.alreadyOwn){
            unavailableText = "Already Own"
        }
        console.log("Already own:" + this.props.alreadyOwn)

        if (unavailable) {
            return <>
                <Card color="red" raised>

                    {this.props.dailyBonus && !this.props.sale && <Label as='span' color='violet' size='large'>
                        DAILY PURCHASE BONUS + {this.props.bonusDesc}
                    </Label>}

                    {this.props.sale && <Label as='span' color='red' size='large'>
                        SALE -{this.props.saleRed}% OFF!
                    </Label>}
                    {this.props.bestValue && <Label as='span' color='orange' size='large'>
                        BEST VALUE $$$
                    </Label>}
                    <Card.Content>
                        {this.props.approxUSDDisplay && <>
                            <Card.Header > {this.props.name} - <span className='HW3SmallStrike'>{c}{this.props.price} {cp}</span> ${approxUSD} </Card.Header>
                        </>}

                        {!this.props.approxUSDDisplay && <>
                            <Card.Header > {this.props.name} - {c}{this.props.price} {cp} </Card.Header>
                        </>}

                    </Card.Content>
                    <Card.Content extra>

                        <div className='HW3StoreItemImage'>
                            <Image src={this.props.imgSrc} size="small" wrapped />
                        </div>
                        <Divider></Divider>
                        {(!dailyRechargeDeal && this.props.dailyBonus) && <div>
                            This item is limited to 1 purchase per day
                        </div>}
                        <div className='HW3BuyItemDark'>
                            <Button color="grey" onClick={() => {
                                this.props.onBuyClick(this.props.price, this.props.name, this.props.currency, this.props.action, this.props.imgSrc)
                            }} disabled={true}>
                                {this.props.currency === 'usd' && <Icon name="plus"></Icon>}  {unavailableText}
                            </Button>
                        </div>
                    </Card.Content>
                </Card>

            </>
        }

        return (
            <>

                <Card color="red" raised>

                    {this.props.dailyBonus && !this.props.sale && <Label as='span' color='violet' size='large'>
                        DAILY PURCHASE BONUS + {this.props.bonusDesc}
                    </Label>}

                    {this.props.sale && <Label as='span' color='red' size='large'>
                        SALE -{this.props.saleRed}% OFF!
                    </Label>}
                    {this.props.bestValue && <Label as='span' color='orange' size='large'>
                        BEST VALUE $$$
                    </Label>}
                    <Card.Content>

                        {this.props.approxUSDDisplay && <>
                            <Card.Header > {this.props.name} - <span className='HW3SmallStrike'>{c}{this.props.price} {cp}</span> ${approxUSD} </Card.Header>
                        </>}

                        {!this.props.approxUSDDisplay && <>
                            <Card.Header > {this.props.name} - {c}{this.props.price} {cp} </Card.Header>
                        </>}
                    </Card.Content>
                    <Card.Content extra>

                        <div className='HW3StoreItemImage'>
                            <Image src={this.props.imgSrc} size="small" wrapped />

                        </div>
                        <Divider></Divider>
                        {this.props.dailyBonus && <>
                            <p>
                                This item is limited to 1 purchase per day
                            </p>
                        </>}
                        <div className='HW3BuyItemDark'>
                            <Button color={buttonColor} onClick={() => {
                                this.props.onBuyClick(this.props.price, this.props.name, this.props.currency, this.props.action, this.props.imgSrc)
                            }} disabled={!this.canPurchase(wealth.gold, wealth.silver, wealth.brass)}>
                                {this.props.currency === 'usd' && <Icon name="plus"></Icon>} {purchaseBtn}
                            </Button></div>
                    </Card.Content>
                </Card>
            </>
        );
    }

}

export default CobSouloStoreItemLight;
