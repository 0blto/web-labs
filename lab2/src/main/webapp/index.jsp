<%@ page import="com.example.lab2.util.Variables" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lab2</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="shortcut icon" href="img/lab-logo.ico">
    <link rel="stylesheet" href="css/tool.css">
</head>
<body>
<table class="main-table">
    <tr>
        <td class="mtd header">
            <div class="description">
                Погрибняк Иван Сергеевич, P32131 <br> Вариант 913
            </div>
        </td>
        <td rowspan="3" class="mtd results">
            <div class="description">
                <h2>Таблица результатов</h2>
            </div>
            <div class="result-container">
                <table class="result">
                    <tr>
                        <th>Тип</th>
                        <th>Текущее время</th>
                        <th>Время работы скрипта (нс)</th>
                        <th class="col">X</th>
                        <th class="col">Y</th>
                        <th class="col">R</th>
                        <th>Результат</th>
                    </tr>
                    <tbody id="result-table">
                    <%=request.getServletContext().getAttribute(Variables.TABLE_NAME)%>
                    </tbody>
                </table>
            </div>
        </td>
    </tr>
    <tr>
        <td class="mtd graphics">
            <div class="description">
                <h2>График</h2>
            </div>
            <div class="graph-block">
                <canvas id="canvas" height="300" width="300"></canvas><br>
                <div id="canvas-label"></div>
            </div>
        </td>

    </tr>
    <tr>
        <td class="mtd interactive">
            <div class="description">
                <h2>Меню</h2>
            </div>
            <form class="form" name="form">
                <table class="form-table">
                    <tr><td class="form-text x-text" colspan="9"><div class="x-text1">Значение x</div></td></tr>
                    <tr class="x-value-row">

                        <td><button class="form-button x-button" value="-4">-4</button></td>
                        <td><button class="form-button x-button" value="-3">-3</button></td>
                        <td><button class="form-button x-button" value="-2">-2</button></td>
                        <td><button class="form-button x-button" value="-1">-1</button></td>
                        <td><button class="form-button x-button" value="0">0</button></td>
                        <td><button class="form-button x-button" value="1">1</button></td>
                        <td><button class="form-button x-button" value="2">2</button></td>
                        <td><button class="form-button x-button" value="3">3</button></td>
                        <td><button class="form-button x-button" value="4">4</button></td>
                    </tr>
                    <tr><td class="form-text y-text" colspan="9">Значение y</td></tr>
                    <tr class="y-value-row">

                        <td colspan="3" id="y-elem">
                            <input type="text" class="form-input y-input" placeholder="(-3 ... 5)">
                            <div class="tool-helper"><div class="tool"></div></div>
                        </td>
                    </tr>
                    <tr><td class="form-text r-text" colspan="9">Значение R</td></tr>
                    <tr class="r-value-row">


                        <td><button class="form-button r-button" value="1">1</button></td>
                        <td><button class="form-button r-button" value="2">2</button></td>
                        <td><button class="form-button r-button" value="3">3</button></td>
                        <td><button class="form-button r-button" value="4">4</button></td>
                        <td><button class="form-button r-button" value="5">5</button></td>
                    </tr>
                    <tr>

                        <td colspan="5">
                            <button type="submit" class="form-submit">Проверить</button>
                        </td>
                        <td colspan="5">
                            <button class="clear">Сброс таблицы</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="10" id="text-error"></td>
                    </tr>
                </table>
            </form>
        </td>
    </tr>
</table>

<script src="js/script.js"></script>
<script src="js/styling.js"></script>
<script src="js/canvas.js"></script>
<script src="js/checker.js"></script>
<script src="js/requester.js"></script>
</body>
</html>