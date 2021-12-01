<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<section class="content">
	<div class="flexbox">
		<input class="item" type="button" value="계정 관리" style="padding: 0;" onClick="location.href='${rootURL}/member/mypage/account'">
	    <input class="item" type="button" value="장바구니" style="padding: 0;" onClick="">
	    <input class="item" type="button" value="주문 내역" style="padding: 0;" onClick="">
	    <input class="item" type="button" value="주문 배송조회" style="padding: 0;" onClick="">
	    <input class="item" type="button" value="결제관리" style="padding: 0;" onClick="">
	    <input class="item" type="button" value="배송지관리" style="padding: 0;" onClick="location.href='${rootURL}/member/mypage/address'">
	</div>
</section>