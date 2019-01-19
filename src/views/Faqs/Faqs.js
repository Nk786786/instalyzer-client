import React from 'react';
import QuestionAnswer from './QuestionAnswer';
import './Faqs.css';

const qas = [
    {
        question: 'מה זה Instalyzer?',
        answer: <div>
            <div>Instalyzer היא מערכת מתוחכמת ומתקדמת לבדיקה של משתמשי אינסטגרם וזיהוי עוקבים מזוייפים. </div>
        </div>
    },
    {
        question: 'מי הקהל שמשתמש ב-Instalyzer?',
        answer: <div>
            <ul>
                <div className='faqs-qa-customers-customer-container'>
                    <li className='faqs-qa-customers-customer-title'>מפרסמים וחברות פרסום</li>
                    <div className='faqs-qa-customers-customer-details'>הצורך הברור של חברת פרסום לדעת כמה חשבון אינסטגרם המיועד לפרסום הוא אמין הוא הסיבה של חברות פרסום לבחור לצרוך את שירותי Instalyzer.</div>
                </div>
                <div className='faqs-qa-customers-customer-container'>
                    <li className='faqs-qa-customers-customer-title'>יזמים</li>
                    <div className='faqs-qa-customers-customer-details'>ייזמים הרוצים לקדם תוכן או מוצר מסויים באמצעות משתמשי אינסטגרם עם הרבה עוקבים, יכולים לזהות האם העוקבים שלהם איכותיים.</div>
                </div>
                <div className='faqs-qa-customers-customer-container'>
                    <li className='faqs-qa-customers-customer-title'>אנשים שרוצים לקנות חשבונות אינסטגרם</li>
                    <div className='faqs-qa-customers-customer-details'>
                        <div>80% מחשבונות האינסטגרם הנמכרים מכילים עוקבים, תגובות ולייקים מזוייפים. במקרה זה הצורך בבדיקת איכות החשבון הוא קריטי!</div>
                        <div style={{ marginTop: '5px' }}>אם עדיין תחליטו לבצע רכישה של חשבון לאחר הבדיקה שלנו, אתם תוכלו לרכוש אותו במחיר שהוא באמת שווה.</div>
                    </div>
                </div>
                <div className='faqs-qa-customers-customer-container'>
                    <li className='faqs-qa-customers-customer-title'>בלוגרים באינסטגרם</li>
                    <div className='faqs-qa-customers-customer-details'>בלוגרים הרוצים לקדם את עצמם באמצעות משתמשי אינסטגרם משפיעים אחרים, מעוניינים לדעת כמה משתמשים אלה משפיעים באמת.</div>
                </div>
            </ul>
        </div>
    },
    {
        question: 'מה הם משתמשים חשודים?',
        answer: <div>
            <div>משתמשים חשודים הם בוטים ו/או אנשים אשר משתמשים בכלים שונים כדי לרמות או לסחור בלייקים, תגובות ועוקבים - בין אם זה בצורה ידנית - לדוגמא לייק עבור לייק או בצורה אוטומטית עם תוכנות וסקריפטים.</div>
            <div className='faq-page-top-margin'>Instalyzer משתמש בלמידת מכונה כדי לאתר משתמשים חשודים. אלגוריתם הסיווג מתבסס על מספר פרמטרים:</div>
            <ul>
                <li>יחס עוקבים/עוקב</li>
                <li>מספר פוסטים</li>
                <li>פרטיות משתמש</li>
                <li>בוטים ידועים</li>
                <li>משתמשים שנפרצו</li>
                <li>תגובות רדודות אשר סביר שהגיעו דרך סקריפט</li>
                <li>פטנטים נוספים אשר אנחנו משתמשים בהם</li>
            </ul>
            <div>בכל אופן, לעולם איננו משתמשים בפרמטר אחד בלבד לקביעת האם משתמש הוא חשוד אלא בשילוב של כמה פרמטרים.</div>
        </div>
    },
    {
        question:
            'איך ייתכן שיש לי עוקבים שהם משתמשים חשודים אפילו שלא קניתי עוקבים?',
        answer: <div>
            <div>בין העוקבים של משתמש אינסטגרם תמיד יהיו עוקבים חשודים, וזה תקין. חלק מהעוקבים פרשו מרשתות חברתיות, נפרצו, סוחרים בלייקים בדוגמת לייק עבור לייק וכו'.</div>
            <div className='faq-page-top-margin'>המטרה שלך היא לשמור על הכמות הזאת נמוכה ככל האפשר ולבדוק באופן תדיר את איכות העוקבים באמצעות דו"ח Instalyzer.</div>
            <div className='faq-page-top-margin'><span style={{ marginLeft: '3px', textDecoration: 'underline' }}>זכרו:</span> מספר העוקבים הגבוה אינו מראה על חשבון אינסטגרם איכותי, אלא רק איכות העוקבים.</div>
        </div>
    },
    {
        question:
            'למה אי אפשר לבדוק משתמשים עם פחות מ-1000 עוקבים?',
        answer: <div>
            <div>פיתחנו את Instalyzer כדי לעזור לאנשים להשתמש בהשקעה שלהם במשתמשי אינסטגרם בצורה חכמה ויעילה.</div>
            <div className='faq-page-top-margin'>רוב לקוחות השירות בודקים משתמשים עם מספר רב של עוקבים ולכן הצורך בבדיקה של פחות מ-1000 עוקבים הוא לא רלוונטי.</div>
            <div className='faq-page-top-margin'>בנוסף, הסטטיסטיקה והמידע שניתן להסיק על לקוחות עם מספר מועט של עוקבים - בין 1000 ל3000 הוא ירוד עקב העובדה שהתוכן הקיים בהם המשמש אותנו למחקר, אינו מספיק.</div>
        </div>
    },
];

export const Faqs = () =>
    <div>
        <h3>שאלות ותשובות</h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {qas.map((qa) => <QuestionAnswer question={qa.question} answer={qa.answer} />)}
        </div>
    </div>;

export default Faqs;