<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <title>{{\Config::get('app.brand')}}: Password Reset !</title>
    </head>
    <body>
        <div>
            <h1>{{\Config::get('app.brand')}}: Password Reset !</h1>
            <br />
            <br />
            <br /><br />
            <a href="{{ url('password/reset/'.$token) }}">Click here to reset your password</a>
            <br /><br />
            Regards,<br />
            <p>Sincerely,</p>
            <p>{{\Config::get('app.brand')}} Team</p>
            <br />
            <td valign="top" class="footer-cell">
                {{\Config::get('app.brand')}}<br>
                <br />
            </td>
        </div>
    </body>
</html>
