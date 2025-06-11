<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React in Laravel</title>
   <meta name="csrf-token" content="{{ csrf_token() }}">
  @viteReactRefresh
  @vite('resources/js/app.jsx')
</head>
<body>
  <div id="app"></div>
</body>
</html>
