    //テスト環境なので、Stripeのidを見せているが、本番では隠しましょう
    
    require('dotenv').config()
    const stripe = require('stripe')(process.env.STRIPE_API_KEY);

    const express = require('express');
    const app = express();
    
    app.use(express.static('public'));
    
    const YOUR_DOMAIN = 'http://localhost:3000';

    //クレカ4242 4242 4242 4242 を入力
    
    app.post('/create-checkout-session', async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1NHlvpGOC31qe2X1Y9rUpJo9',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
        });
        res.redirect(303, session.url)
    })

    app.post('/create-checkout-session2', async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1NHltfGOC31qe2X1NShI5L7Q',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
        });
        res.redirect(303, session.url)
    })
    
    app.get('/success', (req,res) => {
        res.send(`
            <style>
            body {
                text-align: center;
            }
            p {
                text-align: center;
            }
            </style>
            <p>購入ありがとうございます！！1週間以内に発送します🤗</p>
            <button onclick="location.href='/'">ホームに戻る</button>
        `);
    })


    app.get('/cancel', (req,res) => {
        res.send(`
            <style>
            body {
                text-align: center;
            }
            </style>
            <p>購入に失敗しました😭</p>
            <button onclick="location.href='index2.html'">ホームに戻る</button>
        `);
    })
    
    
    app.listen(3000, () => {console.log('Running on port 3000')});