package com.fengwei.servlet;

import javax.servlet.http.HttpServletRequest;

/**
 * Contains the enums associated with processes supported by the
 * {@link ProcessServlet}
 *
 */
public enum ProcessType {
	/**
	 * user
	 */
	USER,
	/**
	 * search
	 */
	SEARCH,
	/**
	 * insert
	 */
	INSERT,
	/**
	 * update
	 */
	UPDATE,
	/**
	 * delete
	 */
	DELETE;

	/**
	 * Extracts the {@link ProcessType} based on the request. The value is retrieved
	 * from the paramater named 'process'
	 *
	 * @param request
	 * @return
	 */
	public static ProcessType extract(HttpServletRequest request) {
		try {
			return ProcessType.valueOf(request.getParameter("process"));
		} catch (Exception e) {
			return null;
		}
	}

}
